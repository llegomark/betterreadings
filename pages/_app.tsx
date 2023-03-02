import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Roboto } from 'next/font/google';
import { Provider } from "react-wrap-balancer";
// Use the `localFont` function from the `@next/font` package to load the Roboto font locally and generate a CSS class for it
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});
// Define the `MyApp` component as a functional component that takes in a `Component` and `pageProps` prop
function MyApp({ Component, pageProps }: AppProps) {
  // Return the `Component` wrapped in a `Provider` component, which is used to provide the app with the React Wrap Balancer state and actions, and the Inter font CSS class
  return (
    <>
      <div className={roboto.className}>
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </div>
    </>
  );
}
// Export the `MyApp` component as the default export of the module
export default MyApp;
