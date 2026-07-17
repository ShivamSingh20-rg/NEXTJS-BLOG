import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

 
const NEON_STRING = "postgresql://neondb_owner:npg_9uWa2TOiHzrb@ep-red-surf-ahey0vpp.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require";


if (NEON_STRING.includes("your_user")) {
  console.error("❌ stop! You need to paste your actual Neon connection string into line 6 first!");
  process.exit(1);
}

// Manually build the connection pool using the string directly
const pool = new pg.Pool({ connectionString: NEON_STRING });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const articlesData = [
  {
    title: "Mastering CSS Grid",
    category: "Frontend",
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop",
    content: "While Flexbox excels at simple linear navigation bars, building robust two-dimensional layouts requires CSS Grid. This article dives deep into advanced grid tracks, explicit placement, and subgrid mechanics to implement complex developer dashboard interfaces without broken content flows."
  },
  {
    title: "Architecting Scalable Real-time Data SYNC",
    category: "Backend",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop",
    content: "When managing frequent write-heavy operations in applications like task managers, optimizing database connections is critical. Learn how to combine Prisma Client pooling with Next.js API routing and execution barriers to ensure fast serverless queries under load."
  },
  {
    title: "Demystifying JWT Authentication",
    category: "Cybersecurity",
    imageUrl: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcREA1kWp3-KWaJ--h5BWkv7e5veit5105Pi1Ngj69-18YmcMoMB13DqM8Ns5iuaMa9rfNVg4ATg3GqgrxQ",
    content: "Storing tokens inside standard local storage exposes your system to severe Cross-Site Scripting (XSS) risks. Explore secure cookie storage mechanisms, token validation middleware, and automated rotation flows to implement reliable security inside MERN stack applications."
  },
  {
    title: "The Quantum Computing Paradigm",
    category: "Quantum Computing",
    imageUrl: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcR7iWnLrD7vKBMXs77cdBdnLUHEyveQqQbYpyt8zDxzhFzl9ebXbL1E4fDphdFz0jDAGkeP5EL4bKSghVY",
    content: "Quantum processors manipulate information using qubits capable of entering superposition states. This guide introduces the core algorithmic principles behind quantum computing, moving past simple logic gates into the processing boundaries redefining cryptographic security."
  },
  {
    title: "Building Edge-Native Web Services ",
    category: "DevOps",
    imageUrl: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTkP5RK-7b1Rmi6-hIdqkvQO6-XB8RqAOX-qeM2vBzrhsWyL5UZLhRjC0wf4_ud_buZL6gWdRBtb4dawoI",
    content: "Deploying standard cloud server instances introduces unavoidable geographic latency for global users. Edge computing shifts compute cycles directly to nodes located nearest to individual client requests. We explore setting up high-availability infrastructure using Vercel, Render, and AWS Lambda networks."
  },
  {
    title: "Optimizing MongoDB Indexing ",
    category: "Database",
    imageUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop",
    content: "Unindexed database queries degrade performance as collections scale to thousands of records. Discover compound tracking indexes, partial querying parameters, and execution analysis tools to optimize your MongoDB models and prevent sudden API delays."
  },
  {
    title: "Automating CSE Tasks",
    category: "IoT",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXm8zbrz1nJP4pO5bFexIUKr_0bQsiNmP4BpQZsR0q&s",
    content: "Integrating physical microcontrollers with software ecosystems opens huge doors for workflow automation. Learn how to configure ESP32-CAM lenses, establish firmware configurations, and transmit raw image packets directly to Node.js backend streams for face recognition."
  },
  {
    title: "A Pragmatic Approach to DSA",
    category: "Algorithms",
    imageUrl: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&auto=format&fit=crop",
    content: "Solving complex array processing problems efficiently requires optimization beyond naive nested loops. This breakdown focuses on using the two-pointer technique to achieve linear time complexity optimizations across sorting algorithms and common array constraints."
  },
  {
    title: "State Management Architecture",
    category: "Frontend",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop",
    content: "Redux offers absolute architectural structure but introduces substantial boilerplate overhead. Zustand presents a highly minimal, atomic hook configuration style that reduces rerender cycles while maintaining deterministic application states in highly reactive dashboards."
  },
  {
    title: "The Evolution of Spatial UI",
    category: "Augmented Reality",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ987yhCq3fdFVmAzHZNXwWU5Anl6BXm3G5ETIFLK0f&s",
    content: "Designing user interfaces for real-time heads-up displays requires moving past static coordinate structures. This technical analysis explores spatial layout transformations, hardware canvas rendering, and optimizing user interfaces for augmented reality optics."
  },
  {
    title: "Containerizing Microservices",
    category: "DevOps",
    imageUrl: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&auto=format&fit=crop",
    content: "Shipping raw development configurations into production leaves large, insecure dependencies in your environment images. Learn how to leverage Docker multi-stage build systems to separate compile dependencies, significantly dropping your final container footprints."
  },
  {
    title: "Building Custom React Hooks ",
    category: "Frontend",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7nNs_bOdHKwwuLBbrPFOtGeC2AHIrj4s7RQ&s",
    content: "Writing duplicate Axios handling configurations across every screen introduces technical debt. This walkthrough maps out building structured custom hooks that encapsulate automated abort states, response mutations, and unified error handler catch statements."
  },
  {
    title: "Transitioning Monolithic Express API",
    category: "Backend",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_h_oPF_zKHAsEIWHsFJEcbdKKRlvOrrjCnA&s",
    content: "As applications grow, keeping routing configurations, model formatting, and business rules inside single server controllers leads to brittle code bases. We review restructuring Express configurations into cleanly decoupled architectural modules."
  },
  {
    title: "The Developer Guide to Web Security",
    category: "Cybersecurity",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop",
    content: "Cross-Origin Resource Sharing (CORS) faults are a frequent bottleneck during full-stack local server deployment. Discover how to configure secure response header configurations, authorize API clients, and harden Helmet middleware defenses against common cross-site scripts."
  },
  {
    title: "Designing High-Concurrency Data Pipelines ",
    category: "Cloud Computing",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop",
    content: "Processing high volumes of user media assets directly on application threads blocks server capacity. Learn how to securely delegate uploads straight to object storage buckets using AWS S3 signed URLs, invoking light lambda compute hooks to handle async thumbnail scaling."
  }
];

async function main() {
  console.log("🚀 Establishing direct hardcoded link to Neon Cloud...");

  let user = await prisma.user.findFirst();
  
  if (!user) {
    console.log("⚠️ No user account matched. Creating seed manager account...");
    user = await prisma.user.create({
      data: {
        name: "Shivam Singh",
        email: "shivam@example.com"
      }
    });
  }

  console.log(`👤 Active Author Account: ${user.name} (ID: ${user.id})`);

  const finalizedArticles = articlesData.map((article) => ({
    ...article,
    authorId: user!.id, 
  }));

  console.log("📡 Pushing articles payload data directly...");
  const result = await prisma.article.createMany({
    data: finalizedArticles,
    skipDuplicates: true,
  });

  console.log(`🎉 SUCCESS! Mass-published ${result.count} tech articles directly into Neon DB!`);
}

main()
  .catch((e) => {
    console.error("❌ Script crashed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
    console.log("🔌 Database connection safely disconnected.");
  });