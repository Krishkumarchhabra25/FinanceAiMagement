import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const handleGoogleSignUp = () => {
    console.log("Google sign up clicked");
  };

  const handleGithubSignUp = () => {
    console.log("GitHub sign up clicked");
  };

  const handleFacebookSignUp = () => {
    console.log("Facebook sign up clicked");
  };

  const handleEmailSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email sign up");
  };

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
          <h2 className="text-3xl font-bold text-white">Create account</h2>
          <p className="text-gray-400 mt-2">Get started with FinanceAI</p>
        </div>

        <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
          <form onSubmit={handleEmailSignUp} className="space-y-6">
            <div>
              <Label htmlFor="fullName" className="text-gray-300">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                className="mt-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="mt-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                className="mt-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                required
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="mt-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-gray-700 hover:bg-gray-600 text-white">
              Create Account
            </Button>
          </form>

          <div className="my-6">
            <div className="relative">
              <Separator className="bg-gray-700" />
              <div className="absolute inset-0 flex justify-center">
                <span className="bg-gray-900 px-2 text-gray-400 text-sm">Or continue with</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleGoogleSignUp}
              variant="outline"
              className="w-full bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
            >
              <Mail className="w-5 h-5 mr-2" />
              Continue with Google
            </Button>

            <Button
              onClick={handleGithubSignUp}
              variant="outline"
              className="w-full bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
            >
              <Github className="w-5 h-5 mr-2" />
              Continue with GitHub
            </Button>

            <Button
              onClick={handleFacebookSignUp}
              variant="outline"
              className="w-full bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
            >
              <span className="w-5 h-5 mr-2 text-blue-500">f</span>
              Continue with Facebook
            </Button>
          </div>

          <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account?{" "}
            <Link to="/signin" className="text-white hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
