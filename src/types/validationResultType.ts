export type PathObjectType = {
    initial_state: string;
    final_state: string;
    char: string;
    stack: string;
};

export type validationResultType = {
    result: Boolean,
    path: PathObjectType[],
    word: String,
}