const { PrismaClient } = require("@prisma/client")

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "対談" },
        { name: "起業" },
        { name: "就職" },
        { name: "インターンシップ" },
      ]
    })
    console.log("success!")
  } catch (error) {
    console.log("シードデータでエラーが発生！", error)
  } finally {
    await database.$disconnect();
  }
}

main()