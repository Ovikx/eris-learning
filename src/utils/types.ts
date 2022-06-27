import Eris from "eris";

export interface SlashCommand {
    config: Eris.ChatInputApplicationCommandStructure,
    action: Function
}

export interface Import {
    filename: string,
    import: SlashCommand
}