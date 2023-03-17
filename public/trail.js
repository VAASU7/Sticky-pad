const noteContainer = document.getElementById("app");
const addNoteButton = noteContainer.querySelector(".add");

getNotes().forEach((note) => {
    const noteElement = createNoteElement(note.id,note.content);
    noteContainer.insertBefore(noteElement,addNoteButton);
});
addNoteButton.addEventListener("click",() => addNote());


function getNotes() {
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");

}

function saveNotes(notes){
    localStorage.setItem("stickynotes-notes",JSON.stringify(notes));

}

function createNoteElement(id,content){
    const element = document.createElement("textarea");

    element.classList.add("note");
    element.value = content;
    element.placeholder = "Empty One";

    element.addEventListener("change",() =>{
        upadateNote(id,element.value);
    });

    element.addEventListener("dblclick",() =>{
        const doDelete = confirm("Are you sure with delete..? ");

        if(doDelete){
            deleteNote(id,element);
        }
    });

    return element;
}
function addNote() {
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    };
    const noteElement = createNoteElement(noteObject.id,noteObject.content);
    noteContainer.insertBefore(noteElement,addNoteButton);

    notes.push(noteObject);
    saveNotes(notes);
}
function upadateNote(id,newContent){
    const notes = getNotes();
    const targetNote = notes.filter((note) => note.id ==  id)[0];

    targetNote.content = newContent;
    saveNotes(notes)
}
function deleteNote(id,element){
    const notes = getNotes().filter((note) => note.id != id);

    saveNotes(notes);
    noteContainer.removeChild(element);
}