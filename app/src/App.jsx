import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppLayout from "./layouts/AppLayout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AlertProvider } from "./contexts/AlertProvider";

const queryClient = new QueryClient();

function App() {
    return (
        <AlertProvider>
            <QueryClientProvider client={queryClient}>
                <AppLayout />;
                <ReactQueryDevtools />
            </QueryClientProvider>
        </AlertProvider>
    );
}

export default App;
