import { useState } from "react";
import "./App.css";

function App() {
  const [inputHtml, setInputHtml] = useState("");
  const [outputHtml, setOutputHtml] = useState("");
  const [copySuccess, setCopySuccess] = useState("");

  const cleanHtml = () => {
    try {
      // Create a document parser and a temporary document
      const parser = new DOMParser();
      const doc = parser.parseFromString(
        `<div id="temp-root">${inputHtml}</div>`,
        "text/html"
      );
      const tempRoot = doc.getElementById("temp-root");

      if (!tempRoot) {
        throw new Error("Failed to parse HTML");
      }

      // Function to recursively clean attributes from an element and its children
      const cleanElement = (element: Element): Element => {
        // Create a new element with the same tag name without attributes
        const newElement = doc.createElement(element.tagName.toLowerCase());

        // Copy child nodes
        Array.from(element.childNodes).forEach((child) => {
          if (child.nodeType === Node.ELEMENT_NODE) {
            // Recursively clean child elements
            newElement.appendChild(cleanElement(child as Element));
          } else if (child.nodeType === Node.TEXT_NODE) {
            // Copy text nodes directly
            newElement.appendChild(child.cloneNode(true));
          }
        });

        return newElement;
      };

      // Process all top-level elements in the input HTML
      const cleanedElements = Array.from(tempRoot.childNodes).map((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const cleanedEl = cleanElement(node as Element);
          return cleanedEl.outerHTML;
        } else if (
          node.nodeType === Node.TEXT_NODE &&
          node.textContent?.trim()
        ) {
          return node.textContent;
        }
        return "";
      });

      setOutputHtml(cleanedElements.join(""));
      // Reset copy success message if it was shown previously
      setCopySuccess("");
    } catch (error) {
      console.error("Error cleaning HTML:", error);
      setOutputHtml("Error: Could not clean HTML. Please check your input.");
    }
  };

  // Add example handler
  const setExampleInput = () => {
    setInputHtml(`<h1 data-start="74" data-end="140"><strong data-start="76" data-end="140">Discovering Toronto: A Vibrant City of Diversity and Culture</strong></h1>

<p class="whitespace-pre-wrap break-words">Toronto stands as Canada's largest city and a global hub for culture, finance, and diversity. Nestled along the northwestern shore of Lake Ontario, this vibrant metropolis offers visitors and residents alike an exciting blend of urban sophistication and multicultural charm.</p>`);
  };

  // Copy to clipboard function
  const copyToClipboard = () => {
    if (!outputHtml) {
      setCopySuccess("Nothing to copy!");
      setTimeout(() => setCopySuccess(""), 2000);
      return;
    }

    navigator.clipboard
      .writeText(outputHtml)
      .then(() => {
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        setCopySuccess("Failed to copy!");
        setTimeout(() => setCopySuccess(""), 2000);
      });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>HTML Tag Cleaner</h1>
        <p className="description">
          A simple tool to remove all attributes from HTML tags while preserving
          the structure
        </p>
      </header>

      <div className="text-area-container">
        <div className="text-area-wrapper">
          <h2>Input HTML</h2>
          <textarea
            value={inputHtml}
            onChange={(e) => setInputHtml(e.target.value)}
            placeholder="Paste your HTML here..."
            className="text-area input"
          />
          <div className="input-actions">
            <button onClick={setExampleInput} className="example-button">
              Load Example
            </button>
          </div>
        </div>

        <div className="button-container">
          <button onClick={cleanHtml} className="clean-button">
            ⟶
          </button>
        </div>

        <div className="text-area-wrapper">
          <h2>Output HTML</h2>
          <textarea
            value={outputHtml}
            readOnly
            className="text-area output"
            placeholder="Cleaned HTML will appear here..."
          />
          <div className="copy-container">
            <button
              onClick={copyToClipboard}
              className="copy-button"
              disabled={!outputHtml}
            >
              Copy to Clipboard
            </button>
            {copySuccess && <span className="copy-message">{copySuccess}</span>}
          </div>
        </div>
      </div>

      <div className="action-bar">
        <button onClick={cleanHtml} className="clean-button-large">
          Clean HTML
        </button>
      </div>

      <footer className="app-footer">
        <p>Made with ♥ for developers</p>
      </footer>
    </div>
  );
}

export default App;
