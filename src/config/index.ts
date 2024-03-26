import dotenv from "dotenv"
import path from "path"
dotenv.config({ path: path.join(process.cwd(), ".env") })

export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    jwt: {
        jwt_access_secret: process.env.JWT_ACCESS_SECRET,
        jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
        jwt_access_expaire_in: process.env.JWT_ACCESS_EXPAIRE_IN,
        jwt_refresh_expaire_in: process.env.JWT_REFRESH_EXPAIRE_IN,
        reset_password_token: process.env.RESET_PASSWORD_TOKEN,
        reset_password_token_expaire_in: process.env.RESET_PASSWORD_TOKEN_EXPAIRE_IN,
    }
}