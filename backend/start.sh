#!/bin/bash

# Function to create a React app
create_react_app() {
    npx create-react-app /app/user/my-app
    mv /app/user/my-app/* /app/user/my-app/.* /app/user/ 2>/dev/null
    rmdir /app/user/my-app
}

# Function to create a Vue app
create_vue_app() {
    npm install -g @vue/cli
    vue create -d /app/user/my-app
    mv /app/user/my-app/* /app/user/my-app/.* /app/user/ 2>/dev/null
    rmdir /app/user/my-app
}

# Function to create a Vite app
create_vite_app() {
    npm install -g create-vite
    npx create-vite@latest /app/user/my-app --template react
    mv /app/user/my-app/* /app/user/my-app/.* /app/user/ 2>/dev/null
    rmdir /app/user/my-app
}

# Function to create a Next.js app using an example from GitHub
create_next_app() {
    npx create-next-app /app/user/my-app --use-npm
    git clone https://github.com/vercel/next-learn.git /tmp/next-learn
    mv /tmp/next-learn/basics/learn-starter/* /app/user/
    rm -rf /tmp/next-learn
    rmdir /app/user/my-app 2>/dev/null
}

# Function to create an Express app
create_express_app() {
    npx express-generator /app/user
}

# Function to set up a basic Java project
setup_java() {
    mkdir -p /app/user/src/main/java
    echo "public class Main { public static void main(String[] args) { System.out.println(\"Hello, Java!\"); } }" > /app/user/src/main/java/Main.java
}

# Function to set up a basic C++ project
setup_cpp() {
    echo "#include <iostream>\nint main() { std::cout << \"Hello, C++!\" << std::endl; return 0; }" > /app/user/main.cpp
}

# Function to set up a basic C project
setup_c() {
    echo "#include <stdio.h>\nint main() { printf(\"Hello, C!\\n\"); return 0; }" > /app/user/main.c
}

# Function to set up a basic Python project
setup_python() {
    echo "print('Hello, Python!')" > /app/user/main.py
}

# Function to set up a basic Ruby project
setup_ruby() {
    echo "puts 'Hello, Ruby!'" > /app/user/main.rb
}

# Check if the user directory is empty
if [ -z "$(ls -A /app/user)" ]; then
    # Create boilerplate based on the FRAMEWORK or LANGUAGE environment variable
    case $FRAMEWORK in
        react)
            create_react_app
            ;;
        vue)
            create_vue_app
            ;;
        vite)
            create_vite_app
            ;;
        next)
            create_next_app
            ;;
        express)
            create_express_app
            ;;
        *)
            case $LANGUAGE in
                java)
                    setup_java
                    ;;
                cpp)
                    setup_cpp
                    ;;
                c)
                    setup_c
                    ;;
                python)
                    setup_python
                    ;;
                ruby)
                    setup_ruby
                    ;;
                *)
                    echo "No framework or language specified. Starting with an empty project."
                    ;;
            esac
            ;;
    esac
fi

# Print versions of installed languages and frameworks
echo "Installed language versions:"
echo "Node.js: $(node --version)"
echo "Java: $(java --version | head -n 1)"
echo "Python: $(python3 --version)"
echo "Ruby: $(ruby --version)"
echo "Go: $(go version)"
echo "PHP: $(php --version | head -n 1)"
echo "GCC: $(gcc --version | head -n 1)"
echo "G++: $(g++ --version | head -n 1)"

# Navigate to the application directory
cd /app

# Start the Node.js application
node index.js
