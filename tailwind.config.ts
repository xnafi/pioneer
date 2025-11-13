/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
'./app/**/*.{js,ts,jsx,tsx}',
'./components/**/*.{js,ts,jsx,tsx}'
],
theme: {
extend: {
colors: {
brand: {
DEFAULT: 'var(--color-brand)',
light: 'var(--color-brand-light)'
},
bg: 'var(--color-bg)',
surface: 'var(--color-surface)',
muted: 'var(--color-muted)',
danger: 'var(--color-danger)'
},
fontSize: {
'xxs': ['0.625rem', { lineHeight: '0.875rem' }]
}
}
},
plugins: []
}
