
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginUser } from "@/api/authApi";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth"; 


type SignInFormValues = {
  email: string;
  password: string;
};



const SignIn = () => {

  const {login} = useAuth();


const initialValues: SignInFormValues = {
    email: "",
    password: "",
  };

   const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

const handleLogin = async (
  values: SignInFormValues,
  formikHelpers: { setSubmitting: (isSubmitting: boolean) => void }
) => {
  const { setSubmitting } = formikHelpers;
  try {
    const res = await loginUser(values);
    login(res); // from useAuth context
    toast.success("Signed in successfully!");
  } catch (error) {
    console.error("Email login error:", error);
    toast.error("Invalid email or password!");
  } finally {
    setSubmitting(false);
  }
};


  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  const handleGithubLogin = () => {
    console.log("GitHub login clicked");
  };

/*   const handleFacebookLogin = () => {
    console.log("Facebook login clicked");
  };

  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email sign in");
  }; */

  return (
       <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center mx-auto mb-4"
          >
            <span className="text-white font-bold text-xl">FA</span>
          </motion.div>
          <h2 className="text-3xl font-bold text-white">Welcome back</h2>
          <p className="text-gray-400 mt-2">Sign in to your account</p>
        </div>

        <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="mt-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-gray-300">Password</Label>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    className="mt-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing In..." : "Sign In"}
                </Button>
              </Form>
            )}
          </Formik>

          <div className="my-6 relative">
            <Separator className="bg-gray-700" />
            <div className="absolute inset-0 flex justify-center">
              <span className="bg-gray-900 px-2 text-gray-400 text-sm">Or continue with</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
            >
              <Mail className="w-5 h-5 mr-2" />
              Continue with Google
            </Button>

            <Button
              onClick={handleGithubLogin}
              variant="outline"
              className="w-full bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
            >
              <Github className="w-5 h-5 mr-2" />
              Continue with GitHub
            </Button>
          </div>

          <p className="text-center text-gray-400 text-sm mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-white hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
