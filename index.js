import archieml from 'archieml'

export default ({ 
    onProcess, 
    useLogger, 
    useOperations, 
    constants 
}) => {
    onProcess(() => {
        const logger = useLogger()
        const entities = useOperations([constants.OPERATION_CREATE, constants.OPERATION_UPDATE])
        .map(operation => operation.entity)
        .filter(entity => entity.content && entity.format == 'aml')
    
        for (let entity of entities) {
            entity.meta = Object.assign(entity.meta || {}, archieml.load(entity.content))
            delete entity.content
            logger.trace('ArchieML %s: %s', entity.collection, entity.id)
        }
    })
}