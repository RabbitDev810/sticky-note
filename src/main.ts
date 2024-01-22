// Copyright (c) 2023 Michael Kolesidis (michael.kolesidis@gmail.com)
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

import "./style.css";
import { addNote, render } from "./functions";
import { YELLOW } from "./colors";

/**
 * Elements
 */
// Input
const input = <HTMLInputElement>document.getElementById("input");
input.addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    event.preventDefault();
    addNote(input, stickyNotes, notesBoard);
  }
});

// Notes Board
const notesBoard = document.getElementById("notes-board");

// Add Button
const addButton = document.getElementById("add-button");
if (addButton !== null) {
  addButton.addEventListener("click", () => {
    addNote(input, stickyNotes, notesBoard);
  });
}

/**
 * Notes Storage
 */
let savedStickyNotes = JSON.parse(
  localStorage.getItem("savedStickyNotes") as any
);
if (savedStickyNotes === null) {
  savedStickyNotes = [
    {
      text: "You can start by editing me!",
      checked: false,
      id: Date.now(),
      color: YELLOW,
      rotation: -5,
    },
  ];
  localStorage.setItem("savedStickyNotes", JSON.stringify(savedStickyNotes));
}
const stickyNotes = savedStickyNotes;

/**
 * Function Calls
 */
render(stickyNotes, notesBoard);
