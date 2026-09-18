# Session 10 Exercise — Saving Data With Local Storage

**Session date:** Monday, 14 September — **Milestone 2**
**Builds on:** Sessions 7–8 (DOM + arrays of objects)
**Topics covered:** what browser storage is, `localStorage`, saving data, loading data, updating stored data, removing stored data

> **A note on this session's number:** this was Session 9 in the programme's original numbering, before Git and GitHub moved earlier to Session 4, which shifted everything after it back by one.

## The idea

Right now, your tracker's data lives only in a JavaScript variable — which means it's gone the instant you refresh the page. That's the last major gap before this becomes a real, usable app. `localStorage` is a small storage space built into every browser, tied to one website, that survives page reloads and even closing the browser entirely.

The one thing to really understand today: **`localStorage` only stores strings.** Our applications are an array of objects, so we have to convert it to a string before saving (`JSON.stringify`) and convert it back to a real array when we load it (`JSON.parse`). If this "stringify/parse" idea feels odd at first, that's normal — it's an indirect-feeling step the first time you meet it, but it becomes second nature fast.

By the end of today, your tracker should genuinely survive a page refresh — that's **Milestone 2**, and once it's working, you have a functional MVP (minimum viable product) of the final project.

## In-class practical

Open `starter/` — it picks up from where Session 8 left off (an `applications` array, add/delete/update all working, but nothing persists). Work through the `TODO`s in `script.js`:

1. Write a `saveApplications()` function that converts `applications` to a JSON string with `JSON.stringify()` and saves it with `localStorage.setItem("jobApplications", ...)`.
2. Write a `loadApplications()` function that reads the string back with `localStorage.getItem("jobApplications")`, and — if something was actually saved — converts it back into a real array with `JSON.parse()`.
3. Call `saveApplications()` at the end of every function that changes the data: after adding, after updating a status, after deleting.
4. Call `loadApplications()` once, when the page first loads, before the first render.

**A note on the empty-storage case:** the very first time anyone opens your app, `localStorage.getItem(...)` returns `null` — there's nothing saved yet. Your `loadApplications()` needs to handle that (usually by falling back to an empty array) rather than trying to `JSON.parse(null)`, which will error.

**Done looks like:** add a few applications, refresh the page, and they're all still there. Delete one, refresh again — it stays deleted. Change a status, refresh — the new status is still shown.

## Milestone 2 checklist

- [ ] Adding an application survives a page refresh
- [ ] Deleting an application survives a page refresh
- [ ] Updating a status survives a page refresh
- [ ] Opening the app for the very first time (empty storage) doesn't crash

## Before you sign off tonight

Commit and push your changes to GitHub — tonight's is a milestone worth a clear commit message, e.g. `"Persist applications to localStorage — Milestone 2 (functional MVP)"`.

## Going further (optional challenge)

Open your browser's DevTools → Application tab → Local Storage, and look at the raw JSON string your app is saving. Try manually editing a value there and refreshing the page to see your app load the edited data — this is a good way to build intuition for what's actually happening under the hood.
