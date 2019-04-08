# Improve your experience on YouTube

## Features

* Hide ads
* Add faster playback rates


## Supported Browsers

The extension uses the `MutationObserver` interface which was introduced in:
* Chrome v26
* Firefox v14
* Safari v6.1

These versions are found in the browser support table on [caniuse.com](https://caniuse.com/#feat=mutationobserver).

<br/>

--

## Design Goals

* Easy to change and keep up with the changing website
* Easy to monitor if the extension is still working


## Motivation

This is a hobby project that's really an excuse to:
* Use TypeScript and Babel
* Use Observables but write them from scratch
* Practice test-driven development


## Roadmap

* [x] Create an Observable
* [x] Create an Observable from an EventListener
* [x] Bundle the generated code
* [ ] Create an Observable from a `MutationObserver`
* [ ] Detect when a skippable ad has been added to the DOM
* ...
* [ ] Support Chrome
* [ ] Support Firefox
* [ ] Support Safari

<br/>

--

## References

* The Observables in this project are influenced by:
  * the documentation and source code from the [RxJS](https://github.com/ReactiveX/rxjs) project which is published with an open source Apache License 2.0.
  * the [RxJS Beyond the Basics: Creating Observables from scratch](https://egghead.io/courses/rxjs-beyond-the-basics-creating-observables-from-scratch) course on [Egghead.io](https://egghead.io)
  * the documentation for the `Rx.DOM.fromMutationObserver` API from the [RxJS-DOM](https://github.com/Reactive-Extensions/RxJS-DOM) project which is published with an open source Apache License 2.0
