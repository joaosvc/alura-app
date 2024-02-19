import { motion } from "framer-motion";

export default function TokenValidation() {
  return (
    <>
      <div className="bg-gray-900 opacity-50 flex items-center justify-center w-screen h-screen absolute top-0 left-0 z-20">
      <div className="bg-gray-900 opacity-50 flex items-center justify-center w-screen h-screen absolute top-0 left-0 z-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="w-44 h-20 bg-red-800"
        ></motion.div>
      </div>
    </>
  );
}
