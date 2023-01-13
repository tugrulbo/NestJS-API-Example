import { Provider } from "@nestjs/common"
import { ReadProductPermissionHandler } from "../../permission"

export const ReadProductPermissionProvider: Provider = ReadProductPermissionHandler;