import { useParams, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { useEffect } from "react";
import { useToast } from "./ui/use-toast";
import axios from "axios";

// Define type for params
interface Params {
  domainUrl: string;
}

const RedirectPage = () => {
  const { toast } = useToast();
  const { domainUrl } = useParams<Params>();
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/link/${domainUrl}`
        );
        if (response.status === 200) {
          const originalLink = response.data.originalLink;
          // Ensure the URL is valid
          const url =
            originalLink.startsWith("http://") ||
            originalLink.startsWith("https://")
              ? originalLink
              : "http://" + originalLink;

          // Navigate directly using the navigate function
          window.location.href = url;
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Link does not exist",
          });
        }
      } catch (err) {
        // Handle different error cases
        toast({
          variant: "destructive",
          title: "Error",
          description: "An error occurred while trying to redirect.",
        });
        console.error(err);
      }
    };
    redirect();
  }, [domainUrl, toast]);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Loader />
    </div>
  );
};

export default RedirectPage;
