test("1+2=3, empty array is empty", () => {
  expect(1 + 2).toBe(3);
  expect([].length).toBe(0);
});

const SERVER_URL = "http://localhost:4000";

beforeEach(async () => {
  const deleteAllNotes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
  });
});

test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
  const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
  });
  expect(getAllNotesRes.status).toBe(200);
  const allNotes = await getAllNotesRes.json();
  //console.log(allNotes.response);
  expect(allNotes.response.length).toBe(0);
});

test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
  await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Note1",
      content: "Content1",
    }),
  });

  await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Note2",
      content: "Content2",
    }),
  });

  const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
  });
  expect(getAllNotesRes.status).toBe(200);
  const allNotes = await getAllNotesRes.json();
  expect(allNotes.response.length).toBe(2);
});

test("/deleteNote - Delete a note", async () => {
  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Note1",
      content: "Content1",
    }),
  });

  const postNoteBody = await postNoteRes.json();
  const noteId = postNoteBody.insertedId;

  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${noteId}`, {
    method: "DELETE",
  });
  expect(deleteNoteRes.status).toBe(200);
  const deleteNote = await deleteNoteRes.json();
  expect(deleteNote.response).toBe(`Document with ID ${noteId} deleted.`);
});

test("/patchNote - Patch with content and title", async () => {
  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Note1",
      content: "Content1",
    }),
  });
  const postNoteBody = await postNoteRes.json();
  const noteId = postNoteBody.insertedId;

  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "NewTitle",
      content: "NewContent",
    }),
  });

  expect(patchNoteRes.status).toBe(200);
  const patchNote = await patchNoteRes.json();
  expect(patchNote.response).toBe(`Document with ID ${noteId} patched.`);
});

test("/patchNote - Patch with just title", async () => {
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Note1",
      content: "Content1",
    }),
  });
  const postNoteBody = await postNoteRes.json();
  const noteId = postNoteBody.insertedId;

  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "NewTitle",
    }),
  });

  expect(patchNoteRes.status).toBe(200);
  const patchNote = await patchNoteRes.json();
  expect(patchNote.response).toBe(`Document with ID ${noteId} patched.`);
});

test("/patchNote - Patch with just content", async () => {
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Note1",
      content: "Content1",
    }),
  });
  const postNoteBody = await postNoteRes.json();
  const noteId = postNoteBody.insertedId;

  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: "NewContent",
    }),
  });

  expect(patchNoteRes.status).toBe(200);
  const patchNote = await patchNoteRes.json();
  expect(patchNote.response).toBe(`Document with ID ${noteId} patched.`);
});

test("/deleteAllNotes - Delete one note", async () => {
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Note1",
      content: "Content1",
    }),
  });

  const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
  });

  expect(deleteAllNotesRes.status).toBe(200);
  const deleteNote = await deleteAllNotesRes.json();
  expect(deleteNote.response).toBe(`1 note(s) deleted.`);
});

test("/deleteAllNotes - Delete three notes", async () => {
    await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Note1",
      content: "Content1",
    }),
  });

    await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Note2",
      content: "Content2",
    }),
  });

    await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Note3",
      content: "Content3",
    }),
  });

  const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
  });

  expect(deleteAllNotesRes.status).toBe(200);
  const deleteNote = await deleteAllNotesRes.json();
  expect(deleteNote.response).toBe(`3 note(s) deleted.`);
});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Note1",
      content: "Content1",
    }),
  });

    const postNoteBody = await postNoteRes.json();
    const noteId = postNoteBody.insertedId;

    const updateNoteColorRes = await fetch(`${SERVER_URL}/updateNoteColor/${noteId}`, {
    method: "PATCH",
    bodt: JSON.stringify({
      color: "#FF0000",
    })
  });

  expect(updateNoteColorRes.status).toBe(200);
  const updateNoteColor = await updateNoteColorRes.json();
  expect(updateNoteColor.response).toBe(`Note color updated successfully.`);
});
