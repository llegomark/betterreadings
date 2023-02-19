import type { Transition } from "framer-motion";
import { motion } from "framer-motion";
import useMeasure from "react-use-measure";
// Define the props that the component will receive, including a single child element
interface ResizablePanelProps {
  children: React.ReactElement<HTMLDivElement>;
}
// Define the component as a functional component
const ResizablePanel: React.FC<ResizablePanelProps> = ({ children }) => {
  // Use the useMeasure hook to get the height of the child element
  const [ref, { height }] = useMeasure();
  // Set up the animation properties for the component, including the height as the value to animate
  const animate = { height };
  // Set up the transition properties for the component, including a tween animation with a duration of 0.5 seconds
  const transition: Transition = { type: "tween", duration: 0.5 };
  // Return the child element inside a motion component, with the height animated and the transition defined
  return (
    <motion.div
      animate={animate}
      className="relative w-full overflow-hidden"
      transition={transition}
    >
      <div ref={ref} className="absolute inset-x-0">
        {children}
      </div>
    </motion.div>
  );
};
// Export the component as the default export of the module
export default ResizablePanel;
