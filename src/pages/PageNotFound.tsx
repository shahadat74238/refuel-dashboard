import { useNavigate } from 'react-router-dom';
import { Button, Card, Typography } from 'antd';
import { primaryBtn } from '../constant/btnStyle';

const { Title, Text } = Typography;

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-full flex items-center justify-center bg-background p-6">
            <Card 
                // Increased max-width to 700px and significantly increased padding
                className="w-full max-w-[700px] !border-none shadow-main !rounded-[30px] text-center py-20 px-12 relative overflow-hidden"
            >
                {/* Scaled up the background ghost text */}
                <h1 className="text-[15rem] font-black text-core-primary/10 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 select-none z-0">
                    404
                </h1>

                <div className="relative z-10">
                    {/* Increased "Oops!" from 7xl to 9xl */}
                    <Title level={1} className="!font-black !text-6xl !mb-4 !text-foreground tracking-tighter">
                        Oops!
                    </Title>
                    
                    {/* Increased Sub-title to text-4xl */}
                    <Title level={2} className="!font-bold !text-3xl md:!text-4xl !text-gray-800 !m-0">
                        Page Not Found
                    </Title>
                    
                    {/* Increased Description to text-xl */}
                    <Text className="block text-gray-500 mt-6 mb-12 !text-lg !font-medium  max-w-lg mx-auto leading-relaxed">
                        The page you are looking for might have been removed, 
                        had its name changed, or is temporarily unavailable.
                    </Text>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button
                            onClick={() => navigate(-1)}
                            // Scaled up button width/padding for the larger card
                            className="!h-[60px] !px-12 !border-2 !border-primary !text-foreground !rounded-[12px] !text-lg !font-bold hover:!bg-primary/10 transition-all"
                        >
                            Go Back
                        </Button>
                        
                        <Button
                            style={{...primaryBtn, height: 60}}
                            onClick={() => navigate('/')}
                            // Scaled up button width/padding
                            className="!w-auto !px-12 !text-lg !rounded-[12px] hover:!bg-core-primary/70 duration-300 transition-colors"
                        >
                            Back to Dashboard
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default PageNotFound;