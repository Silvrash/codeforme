from code import InteractiveConsole

 
class Console(InteractiveConsole):
        
    def __init__(*args): InteractiveConsole.__init__(*args)


code = 'a = 1; print(a)'
console = Console()
console.runcode(code)
