import assert from 'node:assert/strict';
import { test } from 'node:test';
import { validateContact } from './contact.ts';

const form = (fields: Record<string, string>) => {
	const data = new FormData();
	for (const [key, value] of Object.entries(fields)) data.set(key, value);
	return data;
};

const complete = {
	naam: 'J. de Vries',
	email: 'bestuur@vve-voorbeeld.nl',
	type: 'Onderhoud',
	bericht: 'Graag een offerte voor onderhoud.'
};

test('accepts a complete request with only the required fields', () => {
	const result = validateContact(form(complete));
	assert.equal(result.ok, true);
	assert.deepEqual(result.errors, {});
	assert.equal(result.values.telefoon, '');
});

test('requires naam, e-mail, type and bericht', () => {
	const result = validateContact(form({}));
	assert.equal(result.ok, false);
	assert.deepEqual(Object.keys(result.errors).sort(), ['bericht', 'email', 'naam', 'type']);
});

test('treats whitespace-only input as empty and trims values', () => {
	const result = validateContact(form({ ...complete, naam: '   ', bericht: '  Vraag  ' }));
	assert.equal(result.errors.naam, 'Vul uw naam in.');
	assert.equal(result.values.bericht, 'Vraag');
});

test('rejects a malformed e-mail address', () => {
	const result = validateContact(form({ ...complete, email: 'bestuur@vve' }));
	assert.match(result.errors.email ?? '', /klopt niet/);
});

test('rejects a request type that is not in the list', () => {
	const result = validateContact(form({ ...complete, type: 'Iets anders' }));
	assert.equal(result.errors.type, 'Kies het type aanvraag.');
});
