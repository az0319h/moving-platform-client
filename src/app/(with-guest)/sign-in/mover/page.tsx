import EasyLoginForm from "@/components/domain/auth/EasyLoginForm";
import LoginForm from "@/components/domain/auth/LoginForm";
import MoverTitle from "@/components/domain/auth/MoverTitle";

export default function MoverSignInPage() {
   return (
      <section className="mx-auto mt-18 mb-31 flex w-82 flex-col items-center lg:w-160">
         {/* 제목 + 기사 페이지로 링크 이동 */}
         <MoverTitle type="login" />

         {/* 서식 */}
         <LoginForm userType="mover" />

         {/* 간편 회원가입 */}
         <EasyLoginForm />
      </section>
   );
}
