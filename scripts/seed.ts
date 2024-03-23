const { PrismaClient } = require("@prisma/client")

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
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