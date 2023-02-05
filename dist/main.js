"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: "*",
        credentials: true,
        allowedHeaders: "*",
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ forbidUnknownValues: false }));
    await app.listen(process.env.PORT || 4444);
}
bootstrap();
//# sourceMappingURL=main.js.map