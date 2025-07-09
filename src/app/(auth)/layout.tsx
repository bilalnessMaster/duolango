import { Navbar } from "@/modules/auth/ui/components/Navbar";

interface Props {

  children: React.ReactNode;
}

const layout = ({ children }: Props) => {


  return (
    <div className="h-screen flex flex-col w-full">
      <div className="">
        <Navbar />
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}

export default layout;
