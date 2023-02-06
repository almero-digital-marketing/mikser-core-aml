import archieml from 'archieml'

export default ({ 
    onProcess, 
    useLogger, 
    useJournal, 
    constants: { OPERATION }
}) => {
    onProcess(() => {
        const logger = useLogger()
        const entities = useJournal(OPERATION.CREATE, OPERATION.UPDATE)
        .map(operation => operation.entity)
        .filter(entity => entity.content && entity.format == 'aml')
    
        for (let entity of entities) {
            entity.meta = Object.assign(entity.meta || {}, archieml.load(entity.content))
            delete entity.content
            logger.trace('ArchieML %s: %s', entity.collection, entity.id)
        }
    })
}