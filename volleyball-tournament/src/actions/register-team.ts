// "use server";

// import prisma  from "@/lib/prisma";
// import { registrationSchema } from "@/schemas/registration";
// import { uploadToCloudinary } from "@/lib/cloudinary";
// import { sendRegistrationEmail } from "@/lib/email";
// import { generateRegistrationId } from "@/lib/utils";
// import { checkRegistrationRateLimit } from "@/lib/rate-limit";
// import { headers } from "next/headers";
// import { revalidatePath } from "next/cache";

// export async function registerTeam(formData: FormData) {
//   try {
//     // Rate limiting
//     const headersList = headers();
//     const ip = headersList.get("x-forwarded-for") || "unknown";
//     const canRegister = await checkRegistrationRateLimit(ip);
    
//     if (!canRegister) {
//       return { 
//         success: false, 
//         error: "Too many registration attempts. Please try again later." 
//       };
//     }

//     // Extract and validate data
//     const data = JSON.parse(formData.get("data") as string);
//     const validated = registrationSchema.parse(data);

//     // Start transaction
//     const result = await prisma.$transaction(async (tx) => {
//       // Get active tournament
//       const tournament = await tx.tournament.findFirst({
//         where: { isActive: true },
//       });

//       if (!tournament) {
//         throw new Error("No active tournament found");
//       }

//       // Generate registration ID
//       const teamCount = await tx.team.count({
//         where: { tournamentId: tournament.id },
//       });
//       const registrationId = generateRegistrationId(tournament.year, teamCount + 1);

//       // Upload team logo if exists
//       let teamLogo: string | null = null;
//       const logoFile = formData.get("teamLogo") as File;
//       if (logoFile && logoFile.size > 0) {
//         teamLogo = await uploadToCloudinary(
//           logoFile,
//           `teams/${registrationId}`,
//           `logo-${Date.now()}`
//         );
//       }

//       // Create team
//       const team = await tx.team.create({
//         data: {
//           registrationId,
//           teamName: validated.team.teamName,
//           teamLogo,
//           captainName: validated.team.captainName,
//           captainPhone: validated.team.captainPhone,
//           captainEmail: validated.team.captainEmail,
//           district: validated.team.district,
//           municipality: validated.team.municipality,
//           address: validated.team.address,
//           tournamentId: tournament.id,
//           status: "pending",
//         },
//       });

//       // Create payment
//       const paymentScreenshot = formData.get("paymentScreenshot") as File;
//       let screenshotUrl: string | null = null;
      
//       if (paymentScreenshot && paymentScreenshot.size > 0) {
//         screenshotUrl = await uploadToCloudinary(
//           paymentScreenshot,
//           `payments/${registrationId}`,
//           `payment-${Date.now()}`
//         );
//       }

//       await tx.payment.create({
//         data: {
//           transactionId: validated.payment.transactionId,
//           paymentMethod: validated.payment.paymentMethod,
//           amount: validated.payment.amount,
//           screenshot: screenshotUrl,
//           teamId: team.id,
//         },
//       });

//       // Create players
//       for (let i = 0; i < validated.players.length; i++) {
//         const player = validated.players[i];
        
//         // Upload player documents
//         const passportPhoto = formData.get(`player_${i}_photo`) as File;
//         const citizenshipFront = formData.get(`player_${i}_citizenship_front`) as File;
//         const citizenshipBack = formData.get(`player_${i}_citizenship_back`) as File;

//         const [photoUrl, frontUrl, backUrl] = await Promise.all([
//           passportPhoto ? uploadToCloudinary(passportPhoto, `players/${registrationId}`, `player-${i}-photo`) : null,
//           citizenshipFront ? uploadToCloudinary(citizenshipFront, `players/${registrationId}`, `player-${i}-citizenship-front`) : null,
//           citizenshipBack ? uploadToCloudinary(citizenshipBack, `players/${registrationId}`, `player-${i}-citizenship-back`) : null,
//         ]);

//         await tx.player.create({
//           data: {
//             fullName: player.fullName,
//             dateOfBirth: new Date(player.dateOfBirth),
//             age: player.age,
//             phoneNumber: player.phoneNumber,
//             address: player.address,
//             position: player.position,
//             jerseyName: player.jerseyName,
//             jerseyNumber: player.jerseyNumber,
//             jerseySize: player.jerseySize,
//             passportPhoto: photoUrl,
//             citizenshipFront: frontUrl,
//             citizenshipBack: backUrl,
//             teamId: team.id,
//           },
//         });
//       }

//       return { team, registrationId };
//     });

//     // Send confirmation email
//     await sendRegistrationEmail(
//       validated.team.captainEmail,
//       validated.team.teamName,
//       result.registrationId
//     );

//     revalidatePath("/");

//     return {
//       success: true,
//       registrationId: result.registrationId,
//       message: "Team registered successfully! Check your email for confirmation.",
//     };
//   } catch (error) {
//     console.error("Registration error:", error);
//     return {
//       success: false,
//       error: error instanceof Error ? error.message : "Registration failed. Please try again.",
//     };
//   }
// }