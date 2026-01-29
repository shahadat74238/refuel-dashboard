import type { ReactNode } from "react";
import cn from "../lib/cn";
import { useNavigate } from "react-router";
import { Button } from "antd";
import { primaryBtn } from "../constant/btnStyle";
import { ArrowLeft } from "lucide-react";

interface PageContentProps {
  children: ReactNode;
  className?: string;
}

interface NavigateButton {
  buttonText: string;
  type: "navigate";
  route: string;
  icon?: ReactNode;
}

interface ActionButton {
  buttonText: string;
  icon?: ReactNode;
  type: "action";
  onClick: () => void;
}

type PageButton = NavigateButton | ActionButton;

interface PageLayoutProps {
  title: string;
  children: ReactNode;
  className?: string;
  isButton?: PageButton;
}

export const PageLayout = ({
  title,
  children,
  className,
  isButton,
}: PageLayoutProps) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (!isButton) return;
    if (isButton.type === "navigate") {
      navigate(isButton.route);
    } else {
      isButton.onClick();
    }
  };

  return (
    <div className={cn(" rounded", className)}>
      <div className="flex items-center justify-between">
        {title && (
          <h1
            onClick={() => navigate(-1)}
            className="text-xl font-semibold cursor-pointer flex items-center gap-2 w-fit text-gray-800 mb-4"
          >
            <ArrowLeft size={24} />
            {title}
          </h1>
        )}

        {isButton && (
          <Button
            size="large"
            style={primaryBtn}
            onClick={handleButtonClick}
            icon={isButton.icon}
          >
            {isButton.buttonText}
          </Button>
        )}
      </div>

      <div className="p-2">{children}</div>
    </div>
  );
};

export const PageContent = ({ children, className }: PageContentProps) => {
  return <div className={cn("space-y-4", className)}>{children}</div>;
};
