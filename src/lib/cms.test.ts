import assert from 'node:assert/strict';
import { test } from 'node:test';
import { markdownToHtml, slugify, stripFrontmatter, validate, type CmsPost } from './cms.ts';

const post: CmsPost = {
	slug: 'nieuwe-liften',
	title: 'Nieuwe liften',
	date: '2026-10-31',
	category: 'Projecten',
	image: 'liftDoors',
	excerpt: 'Kort.',
	body: 'Tekst.',
	status: 'concept'
};

test('slugify drops accents and punctuation', () => {
	assert.equal(slugify('Nivå: één lift, 24/7!'), 'niva-een-lift-24-7');
	assert.equal(slugify('  --  '), '');
});

test('stripFrontmatter keeps only the body, also with CRLF line endings', () => {
	assert.equal(stripFrontmatter("---\ntitle: 'x'\n---\n\nTekst."), 'Tekst.');
	assert.equal(stripFrontmatter("---\r\ntitle: 'x'\r\n---\r\n\r\nTekst."), 'Tekst.');
});

test('validate accepts a complete post', () => {
	assert.deepEqual(validate(post, [], null), {});
});

test('validate reports empty fields and a bad web address', () => {
	const errors = validate({ ...post, title: ' ', slug: 'Niet Goed', body: '' }, [], null);
	assert.deepEqual(Object.keys(errors).sort(), ['body', 'slug', 'title']);
});

test('validate rejects a slug taken by another post, not by the post itself', () => {
	assert.ok(validate(post, [post], null).slug);
	assert.equal(validate(post, [post], 'nieuwe-liften').slug, undefined);
});

test('markdownToHtml renders the subset the posts use', () => {
	assert.equal(
		markdownToHtml('## Kop\n\nEen **vette** [link](/contact).\n\n- een\n- twee'),
		'<h2>Kop</h2>\n<p>Een <strong>vette</strong> <a href="/contact">link</a>.</p>\n<ul><li>een</li><li>twee</li></ul>'
	);
});

test('markdownToHtml escapes HTML and drops unsafe links', () => {
	assert.equal(
		markdownToHtml('<script>x</script> [klik](javascript:alert)'),
		'<p>&lt;script&gt;x&lt;/script&gt; klik</p>'
	);
});
