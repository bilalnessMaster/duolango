'use client'
import { useUnitStore } from "../../store/use-unit-store"




export const Display = () => {
  const {title , unit} = useUnitStore();
  return (
    <div className="sticky  bg-white top-0 pt-8 z-10">
      <div className="rounded-xl max-w-xl  mx-auto p-4 bg-[#1CB0F6] space-y-2 text-white font-sans ">
        <h2 className="text-base font-semibold text-white/75">UNIT {unit}</h2>
        <p className="text-lg  font-semibold">{title}</p>
      </div>
    </div>
  )
}
