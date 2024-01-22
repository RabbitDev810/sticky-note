// Copyright (c) 2023 Michael Kolesidis (michael.kolesidis@gmail.com)
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

import { ORANGE, YELLOW, GREEN, BLUE, PINK } from "./colors";

// Create note
export const createNote = (input: HTMLInputElement, stickyNotes: any) => {
  const text = input.value;

  const note = {
    text: text,
    checked: false,
    id: Date.now(),
    color: "",
    rotation: "",
  };

  let num = Math.floor(Math.random() * 5);
  switch (num) {
    case 0:
      note.color = YELLOW;
      break;
    case 1:
      note.color = BLUE;
      break;
    case 2:
      note.color = GREEN;
      break;
    case 3:
      note.color = PINK;
      break;
    case 4:
      note.color = ORANGE;
  }

  let rotation = Math.floor(Math.random() * 13) - 6;
  note.rotation = `${rotation}`;

  stickyNotes.push(note);
  localStorage.setItem("savedStickyNotes", JSON.stringify(stickyNotes));
};

// Add note
export const addNote = (
  input: HTMLInputElement,
  stickyNotes: any,
  notesBoard: any
) => {
  createNote(input, stickyNotes);
  if (notesBoard !== null) {
    notesBoard.innerHTML = ``;
  }
  render(stickyNotes, notesBoard);
  input.value = ``;
};

// Render
export const render = (stickyNotes: any, notesBoard: any) => {
  for (let i = 0; i < stickyNotes.length; i++) {
    const noteContainer = document.createElement("li");
    noteContainer.setAttribute("id", stickyNotes[i].id);
    noteContainer.classList.add("note");
    noteContainer.style.backgroundColor = stickyNotes[i].color;
    noteContainer.style.transform = `rotate(${stickyNotes[i].rotation}deg)`;

    const removeButton = document.createElement("button");
    removeButton.textContent = "✕";
    removeButton.classList.add("remove-button");
    removeButton.setAttribute("id", stickyNotes[i].id);
    removeButton.style.backgroundColor = `rgba(0, 0, 0, 0)`;
    noteContainer.appendChild(removeButton);

    const noteText = document.createElement("p");
    noteText.innerText = stickyNotes[i].text;
    noteText.setAttribute("id", stickyNotes[i].id);
    noteText.setAttribute("contenteditable", "true");
    noteContainer.appendChild(noteText);

    // Save note edits
    noteText.addEventListener(
      "input",
      (event: Event) => {
        if (event) {
          const target = event.target as HTMLParagraphElement;
          let noteId = target.id;
          for (let i = 0; i < stickyNotes.length; i++) {
            if (stickyNotes[i].id == noteId) {
              stickyNotes[i].text = noteText.innerText;
              localStorage.setItem(
                "savedStickyNotes",
                JSON.stringify(stickyNotes)
              );
            }
          }
        }
      },
      false
    );

    if (notesBoard !== null) {
      notesBoard.appendChild(noteContainer);
    }

    // Remove notes
    let removeButtons = document.querySelectorAll(".remove-button");
    removeButtons.forEach((button: Element) => {
      button.addEventListener("click", (event: Event) => {
        if (event) {
          const target = event.target as HTMLButtonElement;
          let noteId = target.id;
          for (let i = 0; i < stickyNotes.length; i++) {
            if (stickyNotes[i].id == noteId) {
              stickyNotes.splice(i, 1);
              localStorage.setItem(
                "savedStickyNotes",
                JSON.stringify(stickyNotes)
              );
              if (notesBoard !== null) {
                notesBoard.innerHTML = ``;
              }
              render(stickyNotes, notesBoard);
            }
          }
        }
      });
    });
  }
};
