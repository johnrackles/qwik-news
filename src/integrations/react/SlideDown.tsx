/** @jsxImportSource react */
import { qwikify$ } from "@builder.io/qwik-react";
import { AnimatePresence, motion } from "framer-motion";

type Props = { hidden: boolean };

export const SlideDown = qwikify$<Props>(function SlideDown({
  children,
  hidden,
}) {
  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
});
