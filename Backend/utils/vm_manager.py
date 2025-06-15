# backend/utils/vm_manager.py

def start_vm(os_type: str) -> str:
    """
    Simulates starting a VM or container for the selected OS.
    """
    print(f"[vm_manager] Starting {os_type} environment...")
    # In a future version, this could hook into Docker, QEMU, or cloud VMs.
    return f"{os_type} VM started successfully [simulated]"

def stop_vm(vm_id: str) -> str:
    """
    Simulates stopping a VM or container by its ID.
    """
    print(f"[vm_manager] Stopping VM with ID: {vm_id}...")
    return f"VM {vm_id} stopped successfully [simulated]"
