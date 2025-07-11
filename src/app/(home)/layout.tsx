import { SideNavBar } from "@/modules/home/ui/components/side-navbar";

interface Props {
  children: React.ReactNode;

}


const layout = ({ children }: Props) => {


  return (
    <div className="flex h-screen -full">
      <div>
        <SideNavBar />
      </div>
      <div className="w-full   overflow-y-auto">
        <div className="w-full  max-w-(--breakpoint-lg) mx-auto flex items-start justify-center px-2">
          {children}
        </div>
      </div>
    </div>
  )
}


export default layout;
