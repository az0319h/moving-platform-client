import BasicInfoForms from "@/components/domain/dashboard/BasicInfoForms";
import BasicInfoFormsTitle from "@/components/domain/dashboard/BasicInfoFormsTitle";

export default function MoverBasicInfoEditPage() {
   return (
      <>
         {/*TODO: 삭제할 것 <div className="mb-6 flex flex-col gap-4 lg:mb-12 lg:gap-8">
            <div className="text-18-semibold lg:text-32-semibold leading-8">
               기본정보 수정
            </div>
         </div> */}
         <BasicInfoFormsTitle />

         <hr className="border-line-100 m-0 border-t p-0" />

         <div className="mt-10">
            <BasicInfoForms />
         </div>
      </>
   );
}
