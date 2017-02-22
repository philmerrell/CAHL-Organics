# Getting Started
Since this is a public repo, in order to hide the endpoints, the base url has been abstracted into a file.
If you are cloning this repo you'll have to create a `src/services/environment.ts` whose contents will look like this:

```ts
export const environment = {
  apiBaseUrl: 'https://some.endpoint/url'
};
```

