<script lang="ts">
	import type { Photo } from '#lib/photos.ts';

	let { photo }: { photo: Photo } = $props();
</script>

Voorbeeldfoto · <a href={photo.credit.source}>{photo.credit.author}</a>,
<a href={photo.credit.licenseUrl}>{photo.credit.license}</a>
