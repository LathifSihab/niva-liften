// The content every page renders. At build time this is `defaults` from content.ts, so the
// prerendered HTML never contains demo edits. In the browser, load() applies what the demo CMS
// saved in this browser (localStorage), follows saves from another tab, and, inside the CMS
// preview frame, shows unsaved drafts sent by the editor.
import type { CmsPost } from './cms.ts';
import { defaults, type Content, type Message, type PhotoKey } from './content.ts';
import { photos, type Photo } from './photos.ts';

const KEY = 'niva-cms-demo';
/** Bump when the shape of Content changes: older demo edits are then dropped, not misread. */
const VERSION = 1;
const PREVIEW = 'niva-cms-preview';
const READY = 'niva-cms-preview-ready';

const fresh = (): Content => structuredClone(defaults);

function setPath(target: Record<string, unknown>, path: string[], value: unknown) {
	let node = target;
	for (const key of path.slice(0, -1)) node = node[key] as Record<string, unknown>;
	node[path[path.length - 1]] = value;
}

class ContentStore {
	data = $state<Content>(fresh());
	/** True once this browser's edits are applied. The CMS waits for it before editing anything. */
	ready = $state(false);
	#loaded = false;

	/** Call once in the browser, after hydration, so the first render matches the prerendered HTML. */
	load() {
		if (this.#loaded) return;
		this.#loaded = true;
		this.#read();
		this.ready = true;
		addEventListener('storage', (event) => {
			if (event.key === KEY || event.key === null) this.#read();
		});
		if (parent !== window) {
			addEventListener('message', ({ origin, data }) => {
				if (origin === location.origin && data?.type === PREVIEW) setPath(this.data, data.path, data.value);
			});
			parent.postMessage({ type: READY }, location.origin);
		}
	}

	/** Saves one part, e.g. save(['pages', 'home'], draft). */
	save(path: string[], value: unknown) {
		setPath(this.data, path, structuredClone($state.snapshot(value)));
		this.data.updated[path.join('.')] = new Date().toISOString();
		this.#write();
	}

	reset() {
		this.data = fresh();
		try {
			localStorage.removeItem(KEY);
		} catch {
			// Nothing stored
		}
	}

	/** Contact-form submissions land here, so the demo inbox shows what was sent from this browser. */
	receive(values: Record<string, string>) {
		const message: Message = {
			id: crypto.randomUUID(),
			received: new Date().toISOString(),
			read: false,
			values
		};
		this.data.inbox = [message, ...this.data.inbox];
		this.#write();
	}

	/** Published posts, newest first, in the shape the news components use. */
	get posts() {
		return this.data.posts
			.filter((post) => post.status === 'gepubliceerd')
			.sort((a, b) => b.date.localeCompare(a.date))
			.map(toNewsItem);
	}

	#read() {
		try {
			const stored = JSON.parse(localStorage.getItem(KEY) ?? 'null');
			this.data = stored?.version === VERSION ? { ...fresh(), ...stored.data } : fresh();
		} catch {
			// Storage blocked or unreadable: show the defaults
		}
	}

	#write() {
		try {
			localStorage.setItem(KEY, JSON.stringify({ version: VERSION, data: $state.snapshot(this.data) }));
		} catch {
			// Storage blocked: the edit lasts until the next reload
		}
	}
}

export const content = new ContentStore();

/** A photo with the alt text as edited in Afbeeldingen. */
export function photoOf(key: string): Photo {
	const photo = photos[key as PhotoKey] ?? photos.liftDoors;
	const alt = content.data.photoAlts[key as PhotoKey];
	return alt ? { ...photo, alt } : photo;
}

export function toNewsItem({ slug, title, date, category, excerpt, image }: CmsPost) {
	return { slug, title, date, category, excerpt, photo: photoOf(image) };
}

/** Sends an unsaved draft to the page shown in a CMS preview frame. */
export function sendPreview(frame: HTMLIFrameElement, path: string[], value: unknown) {
	frame.contentWindow?.postMessage({ type: PREVIEW, path, value: $state.snapshot(value) }, location.origin);
}

/** Calls `ready` whenever a page in a preview frame has loaded and wants the draft. */
export function onPreviewReady(ready: () => void) {
	const listener = ({ origin, data }: MessageEvent) => {
		if (origin === location.origin && data?.type === READY) ready();
	};
	addEventListener('message', listener);
	return () => removeEventListener('message', listener);
}
