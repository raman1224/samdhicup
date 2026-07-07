 import { PrismaClient } from "../generated/prisma/client"; 
import { PrismaPg } from "@prisma/adapter-pg"; 

const globalForPrisma = global as unknown as {
  prisma: PrismaClient; 
}; 
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL, 
}); 
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter, 
  }); 
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma; 
export default prisma; 




//  import { PrismaClient } from "../generated/prisma/client"; 

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined
// }

// const prismaClientSingleton = () => {
//   return new PrismaClient({
//     log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
//     // Increase timeout
//     datasources: {
//       db: {
//         url: process.env.DATABASE_URL,
//       },
//     },
//   })
// }

// export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

// // Export as default for consistency
// export default prisma

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma