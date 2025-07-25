import BasicInfoForms from "@/components/domain/dashboard/BasicInfoForms";
import BasicInfoFormsTitle from "@/components/domain/dashboard/BasicInfoFormsTitle";

export default function MoverBasicInfoEditPage() {
   return (
      <>
         <BasicInfoFormsTitle />

         <hr className="border-line-100 m-0 border-t p-0" />

         <div className="mt-10">
            <BasicInfoForms />
         </div>
      </>
   );
}
