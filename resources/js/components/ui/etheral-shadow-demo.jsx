import EtheralShadow from "@/Components/ui/etheral-shadow";

const DemoOne = () => {
    return (
        <div className="flex w-full h-screen justify-center items-center">
            <EtheralShadow
                color="rgba(128, 128, 128, 1)"
                animation={{ scale: 100, speed: 90 }}
                noise={{ opacity: 1, scale: 1.2 }}
                sizing="fill"
            >
                <h1 className="md:text-7xl text-6xl lg:text-8xl font-bold text-center text-foreground relative z-20">
                    Etheral Shadows
                </h1>
            </EtheralShadow>
        </div>
    );
};

export { DemoOne };
