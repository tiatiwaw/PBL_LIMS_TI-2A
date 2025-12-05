import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    getValidationConfig,
    getColorClass,
} from "@/utils/constant/validation";

export default function OrderValidation({
    status,
    onValidationAction,
    isLoading = false,
}) {
    const config = getValidationConfig(status);

    if (!config) {
        return null;
    }

    // Jika tidak ada actions, tampilkan info message saja
    if (config.actions.length === 0) {
        return (
            <Card className="shadow-xl border-2 border-blue-300 bg-blue-50">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">
                                {config.title}
                            </h3>
                            <p className="text-sm text-slate-600">
                                {config.description}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="shadow-xl border-2 border-primary-hijauMuda bg-primary-hijauTerang">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                            {config.title}
                        </h3>
                        <p className="text-sm text-slate-600">
                            {config.description}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        {config.actions.map((action) => {
                            const IconComponent = action.icon;
                            const colorStyle = getColorClass(
                                action.colorVariant
                            );
                            return (
                                <Button
                                    key={action.id}
                                    onClick={() =>
                                        onValidationAction(action.type)
                                    }
                                    disabled={isLoading}
                                    className="text-white flex items-center gap-2 px-6 py-6 transition-colors"
                                    style={{
                                        backgroundColor: colorStyle.bg,
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor =
                                            colorStyle.bgHover;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor =
                                            colorStyle.bg;
                                    }}
                                >
                                    <IconComponent className="w-5 h-5" />
                                    <span className="font-semibold">
                                        {action.label}
                                    </span>
                                </Button>
                            );
                        })}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
