import fs from "fs";
import path from "path";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const certPath = path.join("/tmp", "aiven-ca.pem");
if (process.env.AIVEN_CA_CERT && !fs.existsSync(certPath)) {
  fs.writeFileSync(certPath, process.env.AIVEN_CA_CERT);
}

const connectionString = `${process.env.DATABASE_URL}?sslmode=verify-full&sslrootcert=${certPath}`;

const adapter = new PrismaPg({ connectionString });
export const prisma = new PrismaClient({ adapter });
