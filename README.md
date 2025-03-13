# HTML Tag Cleaner

A simple React application that allows you to clean HTML by removing all attributes from tags while preserving the tag structure and content.

## Features

- Paste HTML with attributes in the left text area
- Click "Clean HTML" button to process the input
- View the cleaned HTML (with all attributes removed) in the right text area
- Copy the cleaned HTML to your clipboard with one click
- Load an example to see how it works

## Example

**Input:**

```html
<h1 data-start="74" data-end="140">
  <strong data-start="76" data-end="140"
    >Discovering Toronto: A Vibrant City of Diversity and Culture</strong
  >
</h1>
```

**Output:**

```html
<h1>
  <strong>Discovering Toronto: A Vibrant City of Diversity and Culture</strong>
</h1>
```

## How It Works

The application uses the DOM API to parse the input HTML, create new elements without attributes, and transfer the content. This approach handles nested tags correctly, preserving the structure of your HTML while removing all attributes.

## Getting Started

1. Clone this repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`
4. Open your browser to the URL shown in the terminal (typically http://localhost:5173/)

## Technologies Used

- React
- TypeScript
- Vite
- HTML DOM Parser API

## License

MIT
