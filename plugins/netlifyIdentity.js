import netlifyIdentity from 'netlify-identity-widget'


// export default function netlifyIdentity() {

// }

// export default netlifyIdentity
export default (context, inject) => {
//   const hello = (msg) => console.log(`Hello ${msg}!`)
  // Inject $hello(msg) in Vue, context and store.
  inject('netlifyIdentity', netlifyIdentity)
  // For Nuxt <= 2.12, also add 👇
  context.$netlifyIdentity = netlifyIdentity
}
