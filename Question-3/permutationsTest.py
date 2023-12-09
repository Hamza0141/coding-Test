def generate_permutations(input_string):
    # Sort the characters in the input string for a consistent order
    chars = sorted(input_string)
    permutations = []  # List to store generated permutations

    def backtrack(path, used):
        # Base case: If the current path is of the same length as the input string, add it to permutations
        if len(path) == len(chars):
            permutations.append("".join(path))
            return

        # Explore all possible choices for the next character in the permutation
        for i in range(len(chars)):
            # Skip if the character is already used or if it is a duplicate
            if used[i] or (i > 0 and chars[i] == chars[i - 1] and not used[i - 1]):
                continue

            used[i] = True  # Mark the character as used
            path.append(chars[i])  # Add the character to the current path
            backtrack(path, used)  # Recur with the updated path
            used[i] = False  # Backtrack: Mark the character as unused for the next iteration
            path.pop()  # Backtrack: Remove the last character for the next iteration

    backtrack([], [False] * len(chars))  # Start the backtracking process with an empty path and all characters unused
    return permutations  # Return the list of permutations


def main():
    # Provide input strings for testing
    input_strings = ["ban", "xyz", "orA"]

    for input_string in input_strings:
        permutations = generate_permutations(input_string)  # Generate permutations for each input string
        output = ",".join(permutations)  # Join the permutations into a comma-separated string
        print(output)  # Print the result for each input string


if __name__ == "__main__":
    main()  # Run the main function if the script is executed directly
