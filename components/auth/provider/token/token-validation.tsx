import { motion } from "framer-motion";

export default function TokenValidation() {
  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen absolute top-0 left-0 z-20">
        <div className="bg-gray-900 opacity-65 w-screen h-screen absolute top-0 left-0"></div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="w-[30rem] h-[20rem] rounded-lg bg-gray-300 z-10"
        ></motion.div>
      </div>
    </>
  );
}
