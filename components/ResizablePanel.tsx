import { motion } from "framer-motion";
import useMeasure from "react-use-measure";

interface ResizablePanelProps {
  children: React.ReactNode;
}

const ResizablePanel: React.FC<ResizablePanelProps> = ({ children }) => {
  const [ref, { height }] = useMeasure();

  return (
    <motion.div
      animate={{ height }}
      className="relative w-full overflow-hidden"
      transition={{ type: "tween", duration: 0.5 }}
    >
      <div ref={ref} className="absolute inset-x-0">
        {children}
      </div>
    </motion.div>
  );
};

export default ResizablePanel;