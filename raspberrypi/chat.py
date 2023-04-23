import cohere
api_key = "zz3J8EOXV4vaiMD7GLJ0ImTR9RxCbJegb3uhy2Xo"
bot = cohere.Client(api_key=api_key)
res = bot.chat(query = "Hello, world! This is my prompt. Hopefully it is long enough to be useful.",
               persona = "cohere",
               return_chatlog = True,
               return_prompt = True)
print(res)


# response = bot.generate(
#   prompt='Once upon a time in a magical land called',
# )
# print(response)