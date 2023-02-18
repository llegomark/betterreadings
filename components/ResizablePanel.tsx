import type { Transition } from "framer-motion";
import { motion } from "framer-motion";
import useMeasure from "react-use-measure";

interface ResizablePanelProps {
  children: React.ReactElement<HTMLDivElement>;
}

const ResizablePanel: React.FC<ResizablePanelProps> = ({ children }) => {
  const [ref, { height }] = useMeasure();

  const animate = { height };
  const transition: Transition = { type: "tween", duration: 0.5 };

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

export default ResizablePanel;
