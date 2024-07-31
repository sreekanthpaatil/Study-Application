import { motion } from "framer-motion";
const animations = {
  inital: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};
export default function AnimatedPage(props) {
  return (
    <motion.div
      variants={animations}
      initial="inital"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      {props.children}
    </motion.div>
  );
}